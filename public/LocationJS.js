const body = document.querySelector('body');
const div = document.querySelector('div');
const cityInput = document.getElementById("cityInput");
const refreshButton = document.querySelector('#refresh');
const IFrameBackground = document.querySelector('#iframeBackground');
const IFrame = document.createElement('iframe');
const backBtn = document.querySelector("#back");
IFrameBackground.append(IFrame);

	const baseQuery = "https://www.bing.com/search?q=therapists+and+psychologists+clinics+near+me+";
    const city = encodeURIComponent(cityInput.value.trim());
    const source = baseQuery.concat(city);
    IFrame.setAttribute("src", source);

cityInput.addEventListener("input", function (e) {
    const baseQuery = "https://www.bing.com/search?q=therapists+and+psychologists+clinics+near+";
    const city = encodeURIComponent(cityInput.value.trim());
    const source = baseQuery.concat(city);
    IFrame.setAttribute("src", source);
});

refreshButton.addEventListener('click', function (e) {
	const baseQuery = "https://www.bing.com/search?q=therapists+and+psychologists+clinics+near+";
    const city = encodeURIComponent(cityInput.value.trim());
    const source = baseQuery.concat(city);
    IFrame.setAttribute("src", source);
});

backBtn.addEventListener("click", function (e) {
    window.history.back();
})
