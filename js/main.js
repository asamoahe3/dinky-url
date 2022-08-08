(function () {
    const button = document.querySelector('button');
    const userURL = document.getElementById("userLink");
    const shortLink = document.getElementById("shortlink");

    button.addEventListener("click", () => {
        const regexURL = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gim
        if (regexURL.test(userURL.value) === false) {
            return swal({
                title: "Sorry",
                text: "Its eiter you paste or typed in a wrong URL or perharps you enter nothing at all. Kinly check the link and try again",
                icon: "error",
                button: "OK",
            })
        } else {

            let longURL = userURL.value;
            const encodedParams = new URLSearchParams();
            encodedParams.append("url", longURL);

            const options = {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-RapidAPI-Key': '68741cbd14mshd7b5516338806aep14cef8jsnafa7cf444a17',
                    'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com'
                },
                body: encodedParams
            };

            fetch('https://url-shortener-service.p.rapidapi.com/shorten', options)
                .then((response) => response.json())
                .then((response) => {
                    const data = JSON.stringify(response, undefined, 4);
                    const str = JSON.parse(data, undefined, 4);
                    const { result_url } = str;
                    shortLink.classList.remove('is-hidden');
                    document.getElementById("dinkyURL").value = result_url;
                })
                .catch(function (err) {
                    console.error(err);
                });
        }
    })

    // WOW JS
    new WOW().init();

    //Typewriter JS
    new TypeWriter('#userLink',
        ['https://paste your long url link here...',
            'https://type your long url link here...',],
        { writeDelay: 90 });

    // Clipboard JS active
    var clipboard = new ClipboardJS('.clipbutton');
    clipboard.on('success', function (e) {
        swal("Copied to clipboard", e.text, "success", {
            timer: 3500,
        });
        e.clearSelection();
    });

    clipboard.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });

})();
