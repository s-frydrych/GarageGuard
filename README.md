# GarageGuard
## How does it work?
__` 1. Program takes a photo using camera`__
  <br></br>
__`2. Delay 1s`__
  <br></br>
__`3. Program takes another photo`__
  <br></br>
__`4. Motion detector compares these 2 images, if there is a motion detected, switch is activated, 2nd image is saved into 'saved' folder`__
__`5. The second image is sent to ocr.space where is recognized text from the image (vehicle registration plate text)`__
  <br></br>
## Why?
#### It could be uselful on filling stations or in city's to locate criminals, I believe that people would find more uses.
## Is it effective?
#### More than you think, the text is being recognized on every motion so if the car is moving too fast on the first frame, the registration plate can be recognized on second frame. The text from image engine this script is using might not be the best and because of that Im going to make a version using __<a href='https://github.com/tesseract-ocr'>Tesseract</a>__.
## Wow, it seems cool!
#### Thanks! Im accepting pull requests if you want to contribute.

## Sample
### Object:
<a href="https://imgbb.com/"><img src="https://i.ibb.co/51RWdjS/cnm.jpg" alt="cnm" border="0"></a>
### Log:
<a href="https://ibb.co/nPSftXS"><img src="https://i.ibb.co/y4J57zJ/image.png" alt="image" border="0"></a>


