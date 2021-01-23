function sendMail(contactForm) {
    emailjs.send("gmail", "Nuno", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "contact_request": contactForm.querysummary.value
    })
    .then(
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED",error);
        }
    ); 
    return false;
}

