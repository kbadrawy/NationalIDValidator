# NationalIDValidator

# **Installation** :arrow_down:


   ### A) Clone the Repository to your device :computer:
   ### B) Run the following commands:
```
npm install
```
```
node app.js
```
# **How to Use?**
   Open http://localhost:8000 to view the homepage in your browser.
   
   
   Open http://localhost:8000/id to check the validity of an id for example : http://localhost:8000/30310112103144 .
   
   
# **Thought Process**


### Input :
- National ID

### Output :

#### If valid :
- Birthdate
- Gender
- Governorate Code
#### If not valid :
- A message is displayed as follows :"This National ID Is Not Valid".


### ID information : 
- Century ID(0).
- Birthdate info ID(1->6); in the following format yymmdd
- Governorate Code ID(7->8).
- Gender ID(12); Female if even, Male if odd.
- Checker ID(13); must be between 1 and 9.






   
