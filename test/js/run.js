/**
 * Script to demonstrate the KATService
 * @author <a href="mailto:alex@flanche.net">Alex Dumitru</a>
 */
jQuery(document).ready(function () {
  var myJOBAD = window.myJOBAD = new JOBAD("#text");
  myJOBAD.modules.load("kat", function(){
  	myJOBAD.Setup(); 
  });
});
