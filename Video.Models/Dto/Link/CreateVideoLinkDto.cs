﻿namespace Video.Models.Dto.Link
{
    using System;
    using Enums;

    public class CreateVideoLinkDto
    {
        public long VideoId { get; set; }
        public long FolderId { get; set; }
        public string LinkUrl { get; set; }
        public string LinkCode { get; set; }
        public VideoAccessType CommentsAccessType { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string LinkPassword { get; set; }
    }
}
