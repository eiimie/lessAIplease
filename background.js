chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    chrome.storage.local.get(["filterEnabled", "dateFilterEnabled"], (data) => {
        const filterEnabled = data.filterEnabled === true;
        const dateFilterEnabled = data.dateFilterEnabled === true;

        if ((filterEnabled || dateFilterEnabled) && !details.url.includes("filtered=true")) {
            if (details.url.includes("www.google.com/search")) {
                const url = new URL(details.url);
                const params = new URLSearchParams(url.search);

                // Update the search query with AI filter terms if enabled
                if (filterEnabled && (!params.has('q') || !details.url.includes("-ai") && !details.url.includes("-prompt") && !details.url.includes("-generate") && !details.url.includes("-midjourney"))) {
                    const newQuery = (params.get('q') || '') + ' -ai -prompt -midjourney -stablecog -craiyon -nightcafe';
                    params.set('q', newQuery); // Update the search query
                }

                // Update the search query to restrict date if dateFilter is enabled
                if (dateFilterEnabled && !params.has("tbs")) {
                    params.set("tbs", "cdr:1,cd_max:2022"); // Set date range to 2022 or earlier
                }

                // Add a flag to prevent infinite redirection loop
                params.set("filtered", "true");

                url.search = params.toString(); // Set the modified search parameters
                console.log("Updating URL to:", url.toString()); // Log the new URL

                chrome.tabs.update(details.tabId, { url: url.toString() }, () => {
                    console.log("URL updated successfully.");
                });
            }
        } else {
            console.log("Filters are disabled or already applied.");
        }
    });
}, { url: [{ urlMatches: "www.google.com/search" }] });
