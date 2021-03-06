class CreatePosts < ActiveRecord::Migration
  def change
  	create_table :posts do |t|
  		t.belongs_to :user
  		t.text :body
  		t.boolean :starred, :default => false
  		t.integer :sentiment, :default => 0
  		t.timestamps
  	end
  end
end