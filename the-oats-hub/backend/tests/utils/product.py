"""
Product Test Utilities — Mock fixtures for catalog validation.
"""

def generate_mock_product(name: str = "Test Protein Oats"):
    return {
        "name": name,
        "short_description": "A test product.",
        "brand": "The Oats Hub",
        "is_active": True,
        "variants": [
            {
                "sku": "TEST-OATS-01",
                "price_in_paise": 199900,
                "stock_quantity": 100,
                "is_default": True
            }
        ]
    }
