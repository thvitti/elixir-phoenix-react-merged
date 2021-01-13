defmodule Youtubeflix.Repo.Migrations.CreateVideos do
  use Ecto.Migration

  def change do
    create table(:videos) do
      add :title, :string, null: false
      add :url, :string
      add :category_id, references(:categories), null: false
      add :user_id, references(:users), null: false


      timestamps()
    end

    create index(:videos, [:category_id])
    create index(:videos, [:user_id])
    create unique_index(:videos, [:title])
  end
end
