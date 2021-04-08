using System;
using System.IO;

namespace vega.Extensions
{
    public static class IFileExtensions
    {
        public static string ChangeFileName(this string fileName)
        {
            return Guid.NewGuid().ToString() + Path.GetExtension(fileName);
        }
    }
}