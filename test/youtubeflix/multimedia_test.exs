defmodule Youtubeflix.MultimediaTest do
  use Youtubeflix.DataCase

  alias Youtubeflix.Multimedia

  describe "videos" do
    alias Youtubeflix.Multimedia.Video

    @valid_attrs %{title: "some title", url: 42}
    @update_attrs %{title: "some updated title", url: 43}
    @invalid_attrs %{title: nil, url: nil}

    def video_fixture(attrs \\ %{}) do
      {:ok, video} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Multimedia.create_video()

      video
    end

    test "list_videos/0 returns all videos" do
      video = video_fixture()
      assert Multimedia.list_videos() == [video]
    end

    test "get_video!/1 returns the video with given id" do
      video = video_fixture()
      assert Multimedia.get_video!(video.id) == video
    end

    test "create_video/1 with valid data creates a video" do
      assert {:ok, %Video{} = video} = Multimedia.create_video(@valid_attrs)
      assert video.title == "some title"
      assert video.url == 42
    end

    test "create_video/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Multimedia.create_video(@invalid_attrs)
    end

    test "update_video/2 with valid data updates the video" do
      video = video_fixture()
      assert {:ok, %Video{} = video} = Multimedia.update_video(video, @update_attrs)
      assert video.title == "some updated title"
      assert video.url == 43
    end

    test "update_video/2 with invalid data returns error changeset" do
      video = video_fixture()
      assert {:error, %Ecto.Changeset{}} = Multimedia.update_video(video, @invalid_attrs)
      assert video == Multimedia.get_video!(video.id)
    end

    test "delete_video/1 deletes the video" do
      video = video_fixture()
      assert {:ok, %Video{}} = Multimedia.delete_video(video)
      assert_raise Ecto.NoResultsError, fn -> Multimedia.get_video!(video.id) end
    end

    test "change_video/1 returns a video changeset" do
      video = video_fixture()
      assert %Ecto.Changeset{} = Multimedia.change_video(video)
    end
  end

  describe "categories" do
    alias Youtubeflix.Multimedia.Category

    @valid_attrs %{
      color: "some color",
      extra_text: "some extra_text",
      extra_url: "some extra_url",
      title: "some title"
    }
    @update_attrs %{
      color: "some updated color",
      extra_text: "some updated extra_text",
      extra_url: "some updated extra_url",
      title: "some updated title"
    }
    @invalid_attrs %{color: nil, extra_text: nil, extra_url: nil, title: nil}

    def category_fixture(attrs \\ %{}) do
      {:ok, category} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Multimedia.create_category()

      category
    end

    test "list_categories/0 returns all categories" do
      category = category_fixture()
      assert Multimedia.list_categories() == [category]
    end

    test "get_category!/1 returns the category with given id" do
      category = category_fixture()
      assert Multimedia.get_category!(category.id) == category
    end

    test "create_category/1 with valid data creates a category" do
      assert {:ok, %Category{} = category} = Multimedia.create_category(@valid_attrs)
      assert category.color == "some color"
      assert category.extra_text == "some extra_text"
      assert category.extra_url == "some extra_url"
      assert category.title == "some title"
    end

    test "create_category/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Multimedia.create_category(@invalid_attrs)
    end

    test "update_category/2 with valid data updates the category" do
      category = category_fixture()
      assert {:ok, %Category{} = category} = Multimedia.update_category(category, @update_attrs)
      assert category.color == "some updated color"
      assert category.extra_text == "some updated extra_text"
      assert category.extra_url == "some updated extra_url"
      assert category.title == "some updated title"
    end

    test "update_category/2 with invalid data returns error changeset" do
      category = category_fixture()
      assert {:error, %Ecto.Changeset{}} = Multimedia.update_category(category, @invalid_attrs)
      assert category == Multimedia.get_category!(category.id)
    end

    test "delete_category/1 deletes the category" do
      category = category_fixture()
      assert {:ok, %Category{}} = Multimedia.delete_category(category)
      assert_raise Ecto.NoResultsError, fn -> Multimedia.get_category!(category.id) end
    end

    test "change_category/1 returns a category changeset" do
      category = category_fixture()
      assert %Ecto.Changeset{} = Multimedia.change_category(category)
    end
  end
end
