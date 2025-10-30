from django.db import models


class UserInfo(models.Model):
    email = models.EmailField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    phone = models.CharField(max_length=50, null=True, blank=True)
    gender = models.CharField(max_length=50, null=True, blank=True)
    dob = models.DateField(null=True, blank=True)
    password = models.TextField()
    profileImage = models.ImageField(upload_to="uploads/user_profiles/", blank=True, null=True)


class ProductCategory(models.Model):
    categoryName = models.TextField()
    description = models.TextField(null=True, blank=True)


class SubCategory(models.Model):
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, related_name="subcategories")
    subName = models.TextField()
    description = models.TextField(null=True, blank=True)


class ProductDetail(models.Model):
    productID = models.TextField(primary_key=True)
    productName = models.TextField()
    category = models.ForeignKey(ProductCategory, on_delete=models.CASCADE, related_name="products")
    subcategories = models.ManyToManyField(SubCategory, related_name="products")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    addedDate = models.DateTimeField(auto_now_add=True)
    updatedDate = models.DateTimeField(auto_now=True)
    description = models.TextField(null=True, blank=True)
    size = models.TextField(null=True, blank=True)
    material = models.TextField(null=True, blank=True)
    stock = models.PositiveIntegerField(default=0)
    is_available = models.BooleanField(default=True)

class CustomProduct(models.Model):
    user = models.ForeignKey(UserInfo, on_delete=models.CASCADE, related_name="custom_products")
    category = models.ForeignKey(ProductCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name="custom_products")

    profile = models.CharField(max_length=50, blank=True, null=True)
    keyColor = models.CharField(blank=True, null=True)
    textColor = models.CharField(blank=True, null=True)
    customText = models.CharField(max_length=10, blank=True, null=True)
    customImage = models.ImageField(upload_to="uploads/custom_products/", blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"CustomProduct #{self.id} by {self.user.username or self.user.email}"

class CustomerCart(models.Model):
    product = models.ForeignKey(ProductDetail, on_delete=models.CASCADE, null=True, blank=True)
    custom_product = models.ForeignKey(CustomProduct, on_delete=models.CASCADE, null=True, blank=True)
    email = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
    quantities = models.PositiveIntegerField()
    customValue = models.TextField()

    class Meta:
        unique_together = ("email", "product", "customValue")


class ProductOption(models.Model):
    optionType = models.TextField()
    optionName = models.TextField()
    addPrice = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    product = models.ForeignKey(ProductDetail, on_delete=models.CASCADE)
    image = models.TextField(null=True, blank=True)


class CustomType(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)


class Order(models.Model):
    email = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
    orderDate = models.DateTimeField()
    orderStatus = models.TextField(default="รอตรวจสอบ")
    parcelStatus = models.TextField(default="รอตรวจสอบ")
    totalPrice = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    name = models.TextField()
    phone = models.TextField()
    address = models.TextField()
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(ProductDetail, on_delete=models.CASCADE, null=True, blank=True)
    custom_product = models.ForeignKey(CustomProduct, on_delete=models.SET_NULL, null=True, blank=True, related_name="order_items")
    option = models.ForeignKey(ProductOption, on_delete=models.SET_NULL, null=True, blank=True)
    customValue = models.TextField(null=True, blank=True)
    quantities = models.PositiveIntegerField()
    eachTotalPrice = models.DecimalField(max_digits=10, decimal_places=2)
    productName = models.TextField(null=True, blank=True)


class OptionCustom(models.Model):
    orderItem = models.ForeignKey(OrderItem, on_delete=models.CASCADE)
    option = models.ForeignKey(ProductOption, on_delete=models.CASCADE, null=True, blank=True)
    customType = models.ForeignKey(CustomType, on_delete=models.SET_NULL, null=True, blank=True)
    remark = models.TextField(blank=True, null=True)
    attachedIMG = models.ImageField(upload_to="uploads/custom_products/", blank=True, null=True)


class ProviderEditHistory(models.Model):
    modifiedTimestamp = models.DateTimeField()
    productID = models.TextField()
    email = models.TextField()
    modifiedType = models.TextField(null=True, blank=True)
    productDelName = models.TextField(null=True, blank=True)


class ProviderList(models.Model):
    email = models.OneToOneField(UserInfo, on_delete=models.CASCADE, primary_key=True)


class UserAddress(models.Model):
    email = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
    name = models.TextField()
    phone = models.TextField(null=True, blank=True)
    province = models.TextField(null=True, blank=True)
    district = models.TextField(null=True, blank=True)
    subdistrict = models.TextField(null=True, blank=True)
    postal_code = models.TextField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    is_default = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.email.email})"

class ProductImage(models.Model):
    product = models.ForeignKey(ProductDetail, on_delete=models.CASCADE)
    imgURL = models.TextField()


class PaymentDetail(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    transferSlip = models.TextField(null=True, blank=True)
    paymentDate = models.DateTimeField()
