using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

public class BlogRepository
{
    public BlogRepository()
    {
        RetrieveBlogEntries();
    }

    private List<BlogEntry> _blogEntryList;

    public void AddBlog(BlogEntry blog)
    {
        _blogEntryList.Add(blog);
        SaveBlogEntries();
    }

    public List<BlogEntry> GetAllBlogs()
    {
        return _blogEntryList;
    }

    public IEnumerable<BlogEntry> GetBlog(string id)
    {
        var blog = _blogEntryList.Where(blog => blog.Id == id);
        return blog;
    }

    public void UpdateBlog(string id, BlogEntry updatedBlog)
    {
        int index;
        foreach (var blog in _blogEntryList)
        {
            if (blog.Id == id)
            {
                index = _blogEntryList.IndexOf(blog);
                _blogEntryList[index].Title = updatedBlog.Title;
                _blogEntryList[index].Body = updatedBlog.Body;
                break;
            }
        }
        SaveBlogEntries();
    }

    public void DeleteBlog(string id)
    {
        foreach (var blog in _blogEntryList)
        {
            if (blog.Id == id)
            {
                _blogEntryList.Remove(blog);
                break;
            }
        }
        SaveBlogEntries();
    }

    private void SaveBlogEntries()
    {
        XmlSerializer x = new XmlSerializer(typeof(List<BlogEntry>));
        using (TextWriter writer = new StreamWriter("blogEntries.xml"))
        {
            x.Serialize(writer, _blogEntryList);
        }
    }

    private void RetrieveBlogEntries()
    {
        var mySerializer = new XmlSerializer(typeof(List<BlogEntry>));
        using (var myFileStream = new FileStream("blogEntries.xml", FileMode.Open))
        {
            _blogEntryList = (List<BlogEntry>)mySerializer.Deserialize(myFileStream);
        }
    }
}