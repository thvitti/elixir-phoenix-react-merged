# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Youtubeflix.Repo.insert!(%Youtubeflix.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Youtubeflix.Accounts.User
alias Youtubeflix.Multimedia.Category
alias Youtubeflix.Multimedia.Video

alias Youtubeflix.Repo

user =
  %User{}
  |> User.changeset(%{
    username: "user",
    email: "user@test.com",
    password: "123456"
  })
  |> Repo.insert!()


movies =
  %Category{
    title: "Movies",
    color: "orange",
    videos: [
      %Video{
        title: "Interestellar",
        url: "https://www.youtube.com/watch?v=frD_IiY_A3E",
        user: user }]}
|> Repo.insert!()

# policial =
#   %Category{}
#   |> Category.changeset(%{title: "Policial", color: "#d1d1d1",})
#   |> Repo.insert!()
#
# video =
#   %Video{
#     title: "Video Policial 1",
#     url: "https://www.youtube.com/watch?v=sCT50t-JAMw",
#     user: john,
#     category_id: policial.id }
#     |> Repo.insert!()
#
#
# cat2 =
#   %Category{
#     title: "Action",
#     color: "#bababa",
#     videos: [
#     	%Video{
#         	title: "Die Hard (1988)",
#         	url: "https://www.youtube.com/watch?v=jaJuwKCmJbY",
#         	user: john
#         },
#         %Video{
#         	title: "Die Hard 2 (1990)",
#         	url: "https://www.youtube.com/watch?v=gUg4gWjOgXs",
#         	user: john
#         },
#         %Video{
#         	title: "Die Hard 3: With A Vengeance 1995",
#         	url: "https://www.youtube.com/watch?v=gQ0uSh2Hgcs",
#         	user: john
#         },
#         %Video{
#           title: "Live Free or Die Hard (2007)",
#           url: "https://www.youtube.com/watch?v=8Jz-8UcCiws",
#           user: john
#         },
#         %Video{
#           title: "A Good Day to Die Hard (2013)",
#           url: "https://www.youtube.com/watch?v=0_0K7ZfU2e0",
#           user: john
#         },
#
#       ]
#   }
#   |> Repo.insert!()
#
# cat3 =
#   %Category{
#     title: "Horror",
#     color: "#d1ffaa",
#     videos: [
#     	%Video{
#         	title: "Title 3.1",
#         	url: "https://www.youtube.com/watch?v=zc071euiNQE",
#         	user: mary
#         },
#         %Video{
#         	title: "Title 3.2",
#         	url: "https://www.youtube.com/watch?v=zc071euiNQE",
#         	user: mary
#         }
#       ]
#   }
#   |> Repo.insert!()
