chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    chrome.storage.local.get("filterEnabled", (data) => {
        const filterEnabled = data.filterEnabled !== undefined ? data.filterEnabled : false;

        if (filterEnabled) {
            if (details.url.includes("www.google.com/search")) {
                const url = new URL(details.url);
                const params = new URLSearchParams(url.search);

                // Check if filter terms are already present
                if (!params.has('q') || !details.url.includes("-ai") && !details.url.includes("-prompt") && !details.url.includes("-generate") && !details.url.includes("-midjourney")) {
                    const newQuery = (params.get('q') || '') + ' -ai -prompt -generate -midjourney -stablecog -craiyon -nightcafe';
                    params.set('q', newQuery); // Update the search query
                    url.search = params.toString(); // Set the modified search parameters

                    console.log("Updating URL to:", url.toString()); // Log the new URL

                    chrome.tabs.update(details.tabId, { url: url.toString() }, () => {
                        console.log("URL updated successfully.");
                    });
                } else {
                    console.log("URL already contains filter terms.");
                }
            }
        } else {
            console.log("Filter is disabled.");
        }
    });
}, { url: [{ urlMatches: "www.google.com/search" }] });
