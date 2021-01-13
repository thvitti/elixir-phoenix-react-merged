defmodule YoutubeflixWeb.Resolvers.Multimedia do
	alias Youtubeflix.Multimedia
 alias YoutubeflixWeb.Schema.ChangesetErrors


	def category(_parent, %{id: id}, _resolution) do
		{:ok, Multimedia.get_category!(id)}
	end

	def list_categories(_, args, _) do
		{:ok, Multimedia.list_categories(args)}
	end

	def videos_by_category(category,_,_) do
		{:ok, Multimedia.videos_by_category(category)}
	end


	def create_video(_parent, args, %{context: %{current_user: user}}) do

		category_selected = Multimedia.get_category_by(%{title: args.category})
		args = Map.put(args, :category_id, category_selected.id)


		case Multimedia.create_video(user, args) do
			{:ok, video} ->
				{:ok, video}
			{:error, changeset} ->
				{
          :error,
          message: "Could not create video",
          details: ChangesetErrors.error_details(changeset)
        }

		end
	end

	def change_video_category(_parent, args, %{context: %{current_user: user}})  do

		video = Multimedia.get_video!(args.id)

		case Multimedia.update_video(video, args) do
			{:ok, video} ->
				{:ok, video}
			{:error, changeset} ->
				{
          :error,
          message: "Could not change the video category",
          details: ChangesetErrors.error_details(changeset)
        }
		end

	end

	def create_category(_parent, args, %{context: %{current_user: user}} ) do

		case Multimedia.create_category(args) do
			{:ok, category} ->
				{:ok, category}
			{:error, changeset} ->
				{ :error,
					message: "Coult not create a category",
					details: ChangesetErrors.error_details(changeset)
				}
		end

	end

end
