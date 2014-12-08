class AddTranslationOnToUsers < ActiveRecord::Migration
  def change
    add_column :users, :translation, :boolean, :default => false
  end
end
