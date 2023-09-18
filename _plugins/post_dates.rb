module PostDates
  def post_file_path(input)
    posts_folder = '_posts'
    filename = File.basename(input.path)
    File.join(posts_folder, filename)
  end 
end

Liquid::Template.register_filter(:post_last_modified_at) do |input|
  # Construct file path
  post_file_path = PostDates.post_file_path(input)

  # Get last modified date
  post_last_modified_date = File.mtime(post_file_path)

  # Convert to Liquid date
  liquid_date = Liquid::Date.parse(post_last_modified_date)

  # Return formatted date
  liquid_date.strftime('%Y-%m-%d')
end

Liquid::Template.register_filter(:post_originally_posted_at) do |input|
  # Construct file path
  post_file_path = PostDates.post_file_path(input)
  
  # Get original post date
  post_originally_posted_date = `git log #{post_file_path} -1 --format=%cd`.chomp

  # Convert to Liquid date
  liquid_date = Liquid::Date.parse(post_originally_posted_date)

  # Return formatted date 
  liquid_date.strftime('%Y-%m-%d') 
end