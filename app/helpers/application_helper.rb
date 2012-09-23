require 'digest/md5'

module ApplicationHelper
  def page_title(title)
    base = 'EarlGrey'
    if title.empty?
      base
    else
      "#{base} - #{title}"
    end
  end

  def load_js(filenames)
    if filenames.empty?
      # do nothing
    else
      tags = ''
      filenames.each do |f|
        tags << javascript_include_tag(f)
      end
      tags
    end
  end

  def calc_hash(email)
    if (not email.empty?)
      Digest::MD5.hexdigest(email.downcase)
    else
      ""
    end
  end
end
