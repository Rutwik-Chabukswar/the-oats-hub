import hmac
import hashlib
import razorpay
from typing import Dict, Any

from app.core.config import settings
from app.core.exceptions import AppError

class PaymentService:
    """Service handling Razorpay integration and payment validation."""
    
    def __init__(self):
        self.key_id = settings.RAZORPAY_KEY_ID
        self.key_secret = settings.RAZORPAY_KEY_SECRET
        
        # Don't initialize client if keys are missing (helps in testing)
        self.client = None
        if self.key_id and self.key_secret:
            self.client = razorpay.Client(auth=(self.key_id, self.key_secret))

    def _ensure_client(self):
        if not self.client:
            raise AppError("Razorpay client is not configured.", 500)

    def create_razorpay_order(self, amount_in_paise: int, receipt_id: str) -> Dict[str, Any]:
        """Create a new Razorpay order mapping to our internal order."""
        self._ensure_client()
        
        data = {
            "amount": amount_in_paise,
            "currency": "INR",
            "receipt": receipt_id,
            "payment_capture": 1 # Auto capture
        }
        
        try:
            order = self.client.order.create(data=data)
            return order
        except Exception as e:
            raise AppError(f"Failed to create Razorpay order: {str(e)}", 500)

    def verify_payment_signature(self, razorpay_order_id: str, razorpay_payment_id: str, razorpay_signature: str) -> bool:
        """Verify the cryptographic signature from Razorpay to prevent tampering."""
        if not self.key_secret:
            raise AppError("Razorpay secret not configured", 500)
            
        generated_signature = hmac.new(
            self.key_secret.encode("utf-8"),
            f"{razorpay_order_id}|{razorpay_payment_id}".encode("utf-8"),
            hashlib.sha256
        ).hexdigest()
        
        return hmac.compare_digest(generated_signature, razorpay_signature)
        
    def verify_webhook_signature(self, payload: bytes, signature: str) -> bool:
        """Verify a webhook payload's signature."""
        if not self.key_secret:
            return False
            
        generated_signature = hmac.new(
            self.key_secret.encode("utf-8"),
            payload,
            hashlib.sha256
        ).hexdigest()
        
        return hmac.compare_digest(generated_signature, signature)
