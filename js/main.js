(function () {
    const button = document.querySelector('button');
    const userURL = document.getElementById("userLink");
    const setShortenLink = document.getElementById("shortlink");

    button.addEventListener("click", () => {
        const regexURL = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gim

        if (regexURL.test(userURL.value) === false) {
            return swal({
                title: "Sorry",
                text: "You may have entered the incorrect or no URL. Please review your link and try again.",
                icon: "error",
                button: "OK",
            })

        } else {
            async function getData() {
                try {
                    const response = await fetch("https://api.shrtco.de/v2/shorten?url=" + `${userURL.value}`);
                    let data = await response.json();
                    let getShortLink = data.result.short_link2;

                    setShortenLink.classList.remove('is-hidden');
                    document.getElementById("dinkyURL").value = getShortLink;
                    console.log(getShortLink);

                } catch (error) {
                    return swal({
                        title: "Sorry",
                        text: "You have attempted to add a URL that does not follow the general URL shortening rules. We have therefore excluded it from the text length calculation.",
                        icon: "info",
                        button: "OK",
                    })
                }
            }
            getData();
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
