Liquid::Template.register_filter(:post_last_modified_at) do |input|
  # Get the path to the blog post file.
  post_file_path = input.path

  # Get the last modified date of the blog post file.
  post_last_modified_date = File.mtime(post_file_path)

  # Convert the date to a Liquid date object.
  liquid_date = Liquid::Date.parse(post_last_modified_date)

  # Return the formatted date.
  liquid_date.strftime('%Y-%m-%d')
end

Liquid::Template.register_filter(:post_originally_posted_at) do |input|
  # Get the path to the blog post file.
  post_file_path = input.path

  # Get the first commit date of the blog post file.
  post_originally_posted_date = `git log #{post_file_path} -1 --format=%cd`.chomp

  # Convert the date to a Liquid date object.
  liquid_date = Liquid::Date.parse(post_originally_posted_date)

  # Return the formatted date.
  liquid_date.strftime('%Y-%m-%d')
end