




const array =["Ravi","Raju","Aakav","Advik","Chaitanya","Chandran","Darsh ","Darpan","Mars"]

function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}


function sendEmail(){
	emailjs.send("service_dkch45r","template_ddyh2hh",{
		to_person_email:document.querySelector(".userEmail").value,
		to_name:array[4],
		O_id:"#"+getRandomString(20),
		user_name:document.querySelector(".username").value,
		user_address:document.querySelector(".useraddress").value,
		user_phone:document.querySelector(".userphone").value,
		Fruits:document.querySelector("#notepad").value,
		Medicine:document.querySelector("#notepad2").value,
		snack_Groceries:document.querySelector("#notepad3").value,
		Phone_number:Math.floor(Math.random() * 9000000000) + 1000000000
		})
}