import pytest
import hmac
import hashlib
from app.services.payment import PaymentService

def test_verify_payment_signature():
    """Test Razorpay HMAC signature verification logic."""
    service = PaymentService()
    
    # Mock secrets since this isn't starting the full app
    service.key_secret = "test_secret_key_123"
    
    order_id = "order_abc123"
    payment_id = "pay_def456"
    
    # Generate valid signature
    payload = f"{order_id}|{payment_id}"
    valid_signature = hmac.new(
        service.key_secret.encode("utf-8"),
        payload.encode("utf-8"),
        hashlib.sha256
    ).hexdigest()
    
    # Valid
    assert service.verify_payment_signature(order_id, payment_id, valid_signature) is True
    
    # Invalid signature
    assert service.verify_payment_signature(order_id, payment_id, "invalid_sig") is False
    
    # Tampered payload
    assert service.verify_payment_signature("tampered_id", payment_id, valid_signature) is False

def test_verify_webhook_signature():
    """Test Razorpay webhook HMAC validation."""
    service = PaymentService()
    service.key_secret = "test_secret_key_123"
    
    payload = b'{"event": "payment.captured"}'
    
    valid_signature = hmac.new(
        service.key_secret.encode("utf-8"),
        payload,
        hashlib.sha256
    ).hexdigest()
    
    assert service.verify_webhook_signature(payload, valid_signature) is True
    assert service.verify_webhook_signature(payload, "invalid_sig") is False
