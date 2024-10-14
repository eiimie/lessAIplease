chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    if (details.url.includes("www.google.com/search")) {
        // Check if the URL already contains the appended terms
        if (!details.url.includes("-ai") && !details.url.includes("-prompt") && !details.url.includes("-generate") && !details.url.includes("-midjourney")) {
            const newUrl = details.url + "-ai -prompt -generate -midjourney";
            chrome.tabs.update(details.tabId, { url: newUrl });
        }
    }
}, { url: [{ urlMatches: "www.google.com/search" }] });
