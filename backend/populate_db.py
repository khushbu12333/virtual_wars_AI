import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from api.models import CrowdData, FoodItem, Alert

def populate():
    print("Clearing old data...")
    CrowdData.objects.all().delete()
    FoodItem.objects.all().delete()
    Alert.objects.all().delete()

    print("Populating CrowdData...")
    CrowdData.objects.create(section_id="A", name="North Stand", crowd_level="low")
    CrowdData.objects.create(section_id="B", name="East Stand", crowd_level="medium")
    CrowdData.objects.create(section_id="C", name="South Stand", crowd_level="high")
    CrowdData.objects.create(section_id="D", name="West Stand", crowd_level="low")

    print("Populating FoodItems...")
    FoodItem.objects.create(name="Double Smash Burger", description="Two smashed beef patties, cheddar, pickles.", price=12.00, category="Burgers", popular=True)
    FoodItem.objects.create(name="Classic Stadium Dog", description="100% beef hot dog served warm.", price=6.50, category="Hot Dogs", popular=True)
    FoodItem.objects.create(name="Pepperoni Slice", description="Large NYC style slice.", price=5.50, category="Pizza", popular=False)

    print("Populating Alerts...")
    Alert.objects.create(title="Gate 3 is crowded", message="Experiencing heavy traffic.", type="warning", unread=True)
    Alert.objects.create(title="Food ready at counter 2", message="Your order (#892) is hot and ready.", type="success", unread=True)
    Alert.objects.create(title="Match starting in 5 minutes", message="Players are entering the field.", type="info", unread=False)

    print("Successfully populated mock data.")

if __name__ == '__main__':
    populate()
