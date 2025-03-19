const apiUrl = "https://localhost:5001/api/v1/BlogEntries";

async function loadEntries() {
    try {
        const response = await fetch(`${apiUrl}/ListAllBlogs`);
        if (!response.ok) throw new Error("Failed to fetch blog entries");

        const data = await response.json();
        console.log("Received data:", data);

        const entriesDiv = document.getElementById("entries");
        entriesDiv.innerHTML = "";

        data.forEach(entry => {
            const entryDiv = document.createElement("div");
            entryDiv.className = "entry";
            entryDiv.innerHTML = `
                <hr>
                <small>ID: ${entry.id}</small>
                <h3>${entry.title}</h3>
                <p>${entry.body}</p>
                <small>Posted on: ${new Date(entry.posted).toLocaleString()}</small>
                <br>
                <button onclick="deleteEntry('${entry.id}')">Delete</button>
                <button onclick="retrieveBlog('${entry.id}')">Edit</button>
            `;
            entriesDiv.appendChild(entryDiv);
        });
    } catch (error) {
        console.error("Error loading entries:", error);
    }
}

async function addEntry(event) {
    event.preventDefault();
    const id = document.getElementById("id").value;
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

    if (!id || !title) {
        alert("Id and Title are required!");
        return;
    }

    const newEntry = { id, title, body };

    try {
        const response = await fetch(`${apiUrl}/CreateNewBlog`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEntry)
        });

        if (!response.ok) throw new Error("Failed to add blog entry");

        document.getElementById("entryForm").reset();
        loadEntries();
    } catch (error) {
        console.error("Error adding entry:", error);
    }
}

async function deleteEntry(id) {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
        const response = await fetch(`${apiUrl}/DeleteBlogById?id=${id}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Failed to delete blog entry");

        loadEntries();
    } catch (error) {
        console.error("Error deleting entry:", error);
    }
}

async function retrieveBlog(id) {
    try {
        const response = await fetch(`${apiUrl}/RetrieveBlogById?id=${id}`);
        if (!response.ok) throw new Error("Failed to retrieve blog entry");

        const entry = (await response.json())[0];

        document.getElementById("update-id").value = entry.id;
        document.getElementById("update-title").value = entry.title;
        document.getElementById("update-body").value = entry.body;

        document.getElementById("update-section").style.display = "block";
    } catch (error) {
        console.error("Error retrieving entry:", error);
    }
}

async function updateBlog(event) {
    event.preventDefault();
    const id = document.getElementById("update-id").value;
    const title = document.getElementById("update-title").value;
    const body = document.getElementById("update-body").value;

    const updatedEntry = { id, title, body };

    try {
        const response = await fetch(`${apiUrl}/UpdateBlogById?id=${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedEntry)
        });

        if (!response.ok) throw new Error("Failed to update blog entry");

        document.getElementById("updateForm").reset();
        document.getElementById("update-section").style.display = "none";
        loadEntries();
    } catch (error) {
        console.error("Error updating entry:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadEntries);