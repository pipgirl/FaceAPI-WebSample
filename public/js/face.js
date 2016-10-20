function tagImage() {
    //  $("response").value("");
    var imgURL = document.getElementById("imgURL").value;
       var imgDisplay = document.getElementById("imageinput");
       imgDisplay.src = imgURL;

      var params = {
            // Request parameters
            "returnFaceId": "true",
            "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses"
      }
        
    $.ajax({
            url: "https://api.projectoxford.ai/face/v1.0/detect?" + $.param(params),  
            beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "02fa0b4d321a486dbb4c29c3ee25ad2d");
            },
            type: "POST",
            data: "{'url':'" + imgURL+ "'}",
            })
            
            .done(function (data) {
                var dataString = JSON.stringify(data);
                var facesObject = JSON.parse(dataString);
                var facesAmount = facesObject.length;
                facesArray = [];
               
                if(!facesAmount) {
                    document.getElementById("description").innerHTML = "Sorry, I do not recognize a face in this image";
                }
                else {
                for(var i = 0, l = facesAmount; i < l; i++) {
      
                var face = facesObject[i].faceAttributes;
                var glasses = face.glasses;
                var smile = face.smile;
                var gender = face.gender;
                var age = face.age;

                //check if female or male to get pronoun
                var pronoun;
                (gender = "female") ? pronoun = "She" :   pronoun = "He";
            
                //if smile is >.5 then say 'is smiling' 
                var isSmiling;
                (smile > .5) ? isSmiling = "happy" : (smile <.5 && smile >.02) ? isSmiling ="meh" : isSmiling = "not happy" ;

                //what kind of glasses are they wearing
                var glassesType;

                (glasses = "NoGlasses") ? glassesType = " not wearing glasses" : glassesType = " wearing sunglasses";

                facesArray.push("There is a " + gender + glassesType +  ". " + pronoun + " looks " + age + " and is " + isSmiling + ".");
                }
                document.getElementById("description").innerHTML = facesArray;
                }
                

           //Example: There are length people in this picture. There is a woman/male wearing sunglasses/nothing. 'He'/'She' is age and is smiling/notsmiling.
                //apply the tags to the response div
                document.getElementById("response").innerHTML = "Image contains at least one person with" + glasses + smile + gender + age;
  
        //images to test:
    // https://cdn111.picsart.com/214586577002202.jpg
      // https://cdn111.picsart.com/213738630003202.jpg  
      //https://cdn116.picsart.com/214506343001202.jpg  
      //https://cdn113.picsart.com/214670821003202.jpg
      //https://cdn114.picsart.com/214662062001202.jpg
      //
          
            })

            .fail(function (error) {
                $("#description").text("Please provide a valid Image URL");
            })
        };  

       

        

