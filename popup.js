document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("toggleFilter");

    // Load the toggle state from local storage
    chrome.storage.local.get("filterEnabled", (data) => {
        toggle.checked = data.filterEnabled !== undefined ? data.filterEnabled : false; // Default to false
    });

    // Save the toggle state when changed
    toggle.addEventListener("change", () => {
        chrome.storage.local.set({ filterEnabled: toggle.checked });
    });
});
