class CreatePosts < ActiveRecord::Migration
  def change
  	create_table :posts do |t|
  		t.belongs_to :user
  		t.text :body
  		t.boolean :starred, :default => false
  		t.text :sentiment
  		t.timestamps
  	end
  end
end