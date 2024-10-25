document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("toggleFilter");
    const dateToggle = document.getElementById("toggleDateFilter");

    // Load the toggle states from local storage
    chrome.storage.local.get(["filterEnabled", "dateFilterEnabled"], (data) => {
        toggle.checked = data.filterEnabled !== undefined ? data.filterEnabled : false; // Default to false
        dateToggle.checked = data.dateFilterEnabled !== undefined ? data.dateFilterEnabled : false; // Default to false
    });

    // Save the filter toggle state when changed
    toggle.addEventListener("change", () => {
        chrome.storage.local.set({ filterEnabled: toggle.checked });
    });

    // Save the date filter toggle state when changed
    dateToggle.addEventListener("change", () => {
        chrome.storage.local.set({ dateFilterEnabled: dateToggle.checked });
    });
});
