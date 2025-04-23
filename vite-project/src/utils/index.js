export const baseUrl = "http://127.0.0.1:8000"

// This is a new and improved getCookie function
export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


export async function submitDetails(data, route){
    const response = await fetch(`${baseUrl}/${route}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          'X-CSRFToken': getCookie('csrftoken') // assuming you have a function to get csrf token
        },
        body: JSON.stringify(data)
      });
    const status = await response.json();
    return status;
}