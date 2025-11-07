from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
 
ph = PasswordHasher()
hashed = ph.hash("micontraseña123")
print(hashed)

