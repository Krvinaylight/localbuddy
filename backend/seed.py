from app import create_app
from models import db, Product
import random

app = create_app()

categories = ['Vegetables', 'Fruits', 'Staples', 'Dairy', 'Snacks', 'Beverages']

items_data = [
    # Vegetables — specific product-accurate images
    ("Fresh Tomato (1 kg)",       45.0,  "Vegetables", "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400"),
    ("Red Onion (1 kg)",          35.0,  "Vegetables", "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&q=80&w=400"),
    ("Organic Potato (1 kg)",     30.0,  "Vegetables", "https://images.unsplash.com/photo-1518977676601-b53f02bad675?auto=format&fit=crop&q=80&w=400"),
    ("Carrot - Local (500 g)",    25.0,  "Vegetables", "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=400"),
    ("Fresh Ginger (100 g)",      20.0,  "Vegetables", "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=400"),
    ("Green Capsicum (500 g)",    40.0,  "Vegetables", "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&q=80&w=400"),

    # Fruits
    ("Apple - Red (4 pcs)",       130.0, "Fruits",     "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=400"),
    ("Banana - Robusta (1 kg)",   65.0,  "Fruits",     "https://images.unsplash.com/photo-1571771894821-ad9902ed1202?auto=format&fit=crop&q=80&w=400"),
    ("Fresh Papaya (1 pc)",       55.0,  "Fruits",     "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&q=80&w=400"),
    ("Grapes - Green (500 g)",    80.0,  "Fruits",     "https://images.unsplash.com/photo-1537640538966-79f369b41e8f?auto=format&fit=crop&q=80&w=400"),

    # Staples
    ("Premium Atta (5 kg)",       230.0, "Staples",    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400"),
    ("Basmati Rice (1 kg)",       160.0, "Staples",    "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400"),
    ("Fresh Moong Dal (1 kg)",    120.0, "Staples",    "https://images.unsplash.com/photo-1585996853877-ad9aa4761002?auto=format&fit=crop&q=80&w=400"),

    # Dairy
    ("Fresh Milk (500 ml)",       28.0,  "Dairy",      "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=400"),
    ("Paneer - Fresh (200 g)",    85.0,  "Dairy",      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=400"),
    ("Amul Butter (100 g)",       58.0,  "Dairy",      "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80&w=400"),

    # Snacks
    ("Lay's Classic (50 g)",      20.0,  "Snacks",     "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&q=80&w=400"),
    ("Maggi Noodles (280 g)",     58.0,  "Snacks",     "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&q=80&w=400"),

    # Beverages
    ("Coca-Cola (750 ml)",        45.0,  "Beverages",  "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400"),
    ("Bisleri Water (1 L)",       20.0,  "Beverages",  "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=400"),
]

with app.app_context():
    print("Clearing old products...")
    Product.query.delete()
    
    print("Seeding new products...")
    for name, price, category, img_url in items_data:
        p = Product(
            name=name,
            description=f"Fresh and high quality {name}. Perfect for your daily needs.",
            price=price,
            category=category,
            image_url=img_url,
            stock=random.randint(10, 100)
        )
        db.session.add(p)
        
    db.session.commit()
    print("Successfully seeded 50 products!")
