$(document).ready(()=>{

    // let alert_div=$("#grad1");
    // let location=$('#grad1.1');
    // let start_time=$('#grad1.2');
    // let end_time=$('#grad1.3');
    // let cameraID=$('#grad1.4');
    // let activity=$('#grad1.5.5');
    // let scroll_=$('#scroll_');
    let ul=$('#list')
    var loc=$('#locc').text();
    console.log(loc)
    var st=$('#st').text()
    var et=$('#et').text()
    var ci=$('#ci').text()
    var sa=$('#sa').text()
    var img=$('#img_1').attr('src')
    console.log(img)
  
    
    

    
   
      $.get('/api/camera/').then((response) => {
          
          console.log(response);
        for(var i=0;i<response.length;i++)
        {
           
            let longitude=response[i].longitude;
            
            for(var j=0;j<response[i].activities_detected.length;j++)
            {
               var data=[
                 response[i].camera_id,
                 response[i].landmark,
                 response[i].activities_detected[j].start_time,
                 response[i].activities_detected[j].end_time,
                 response[i].activities_detected[j].activity_name,
                response[i].activities_detected[j].screenshot_url

               ]
              
               
              
               var string= response[i].camera_id.toString()+'+'+
               response[i].activities_detected[j].start_time.toString()+'+'+
               response[i].activities_detected[j].end_time.toString()+'+'+
              response[i].activities_detected[j].screenshot_url.toString()+" ";
              console.log(string)
              
        ul.append($(`<li><div style="width: 100%;height: 32%;background-color: white;"class="s-1">
            <p style="margin-left: 2%;color: #ED0F0F;font-family: Interstate;font-size: small;padding: 5px;"><span>${data[1]}</span><br><b>${response[i].activities_detected[j].activity_name}</b> <i class="down"></i></p> 
          </div></li>`).append(`<input class="hidden" value=${string}>`))
          $('.hidden').hide();
        }
    }

        
        if (!response.success) {
          window.alert(response.msg)
        } else {
         
         console.log(response.data)
      

    
        }
      }).fail((err) => {
        console.log(err)
      })

     
      var p=0;
      ul.click((ev)=>{
      
       console.log(ev.target.parentElement.parentElement);
       
      
       if(p==0)
       {
        var $this=$(ev.target.parentElement.parentElement);
           $this.find('div').css("background-color","pink");
           console.log($this.find('input').val())
           console.log($this.find('span').text())
           console.log($this.find('b').text())
          
           var str =  $this.find('input').val();
  var res = str.split("+");
  var landmark1=$this.find('span').text();
  var activity1=$this.find('b').text();
  var camera_1=res[0];
  var st_time=res[1];
  var et_time=res[2];
  console.log(res[3])
  var url=res[3];

  $('#locc').text(landmark1);
  $('#st').text(st_time)
  $('#et').text(et_time)
  $('#ci').text(camera_1)
  $('#sa').text(activity1)
  $('#img_1').attr("src", url);
  

           p=1;
       }
       else{
        var $this=$(ev.target.parentElement.parentElement);
        $('#locc').text(loc);
  $('#st').text(st)
  $('#et').text(et)
  $('#ci').text(ci)
  $('#sa').text(sa)
  $('#img_1').attr("src", img);
        $this.find('div').css("background-color","white");
        p=0;
       }

      });




      var num = 15;
      var n = num.toString();
      console.log(n+'op')




});
