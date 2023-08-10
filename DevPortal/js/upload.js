// Function to handle the drag and drop events
async function handleDrop(event) {
    event.preventDefault();

    let folder;
    if (event.dataTransfer.items) {
        // For modern Chrome
        folder = event.dataTransfer.items[0].getAsFileSystemHandle();
    } else {
        // For older Chrome and Safari
        folder = event.dataTransfer.files[0];
    }

    // Call the function to read the manifest.json file
    await readManifestFile(folder);
}

// Function to read the manifest.json file and display its content
async function readManifestFile(folder) {
    try {
        let manifestFile;

        // Recursively search for the manifest.json file in the folder
        manifestFile = await findManifestFile(folder);

        if (!manifestFile) {
            console.error("manifest.json file not found.");
            return;
        }

        const content = await readFileContent(manifestFile);
        displayManifestContent(content);
    } catch (error) {
        console.error("Error reading manifest file:", error);
    }
}

// Recursive function to find the manifest.json file
async function findManifestFile(folder) {
    const reader = folder.createReader();
    let entries = await readEntries(reader);

    while (entries.length) {
        for (const entry of entries) {
            if (entry.name === 'manifest.json') {
                return entry;
            }
            if (entry.isDirectory) {
                const manifestFile = await findManifestFile(entry);
                if (manifestFile) {
                    return manifestFile;
                }
            }
        }

        entries = await readEntries(reader);
    }

    return null;
}

// Helper function to read entries from a FileSystemDirectoryReader
function readEntries(reader) {
    return new Promise((resolve, reject) => {
        reader.readEntries((entries) => {
            resolve(entries);
        }, (error) => {
            reject(error);
        });
    });
}

// Function to read the content of a file using FileReader
function readFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        file.file((file) => reader.readAsText(file));
    });
}

// Function to display the manifest.json content on the page
function displayManifestContent(content) {
    const manifestContentDiv = document.getElementById("manifest-content");
    manifestContentDiv.innerHTML = `<pre>${content}</pre>`;
}

// Add event listeners for drag and drop
const dropZone = document.getElementById("drop-zone");
dropZone.addEventListener("dragover", function (event) {
    event.preventDefault();
});

dropZone.addEventListener("drop", handleDrop);
