using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

[ApiController]
[Route("api/v1/[controller]")]
public class BlogEntriesController : ControllerBase
{
    BlogRepository blogRepository = new BlogRepository();

    [HttpGet("ListAllBlogs")]
    public List<BlogEntry> ListAllBlogs()
    {
        return blogRepository.GetAllBlogs();
    }

    [HttpGet("RetrieveBlogById")]
    public IEnumerable<BlogEntry> RetrieveBlogById(string id)
    {
        return blogRepository.GetBlog(id);
    }

    [HttpPost("CreateNewBlog")]
    public void CreateNewBlog([FromBody] BlogEntry entry)
    {
        entry.Posted = DateTime.Now;
        blogRepository.AddBlog(entry);
    }

    [HttpPut("UpdateBlogById")]
    public void UpdateBlogById(string id, [FromBody] BlogEntry entry)
    {
        entry.Posted = DateTime.Now;
        blogRepository.UpdateBlog(id, entry);
    }

    [HttpDelete("DeleteBlogById")]
    public void DeleteBlogById(string id)
    {
        blogRepository.DeleteBlog(id);
    }
}