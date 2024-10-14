chrome.webNavigation.onBeforeNavigator.addListen((details) => {
    if (details.url.includes("www.google.com/search")) {
        const newUrl = details.url + "-ai";
        chrome.tabs.update(details.tabId, { url: newUrl });
    }
}, { url: [{ urlMatches: "www.google.com/search "}] }); 