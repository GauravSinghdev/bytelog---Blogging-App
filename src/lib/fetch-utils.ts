import prisma from "./db";

export async function fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    return response.json();
  }

  export async function fetchMyData<T>(url: string): Promise<T> {
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    return response.json();
  }


export async function postData<T>(url: string, data: unknown): Promise<T> {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    return response.json();
  }
  
  export async function getBlogById(id: string) {
    return prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }
  
  export async function deleteBlog<T>(url: string, blogId: string): Promise<T> {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blogId }),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    return response.json();
  }
  
  export async function getProfileById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });
  }
  
