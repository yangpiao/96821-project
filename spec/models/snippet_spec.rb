require 'spec_helper'

describe Snippet do
  it "properties match parameters of new" do
    snippet = Snippet.new ({
      :name => "test snippet",
      :content => "some code",
      :desc => "some description",
      :filetype => 1
    })
    snippet.name.should == "test snippet"
    snippet.content.should == "some code"
    snippet.desc.should == "some description"
    snippet.filetype.should == 1
  end

  it "should be invalid without name" do
    snippet = Snippet.new
    snippet.content = "some code"
    snippet.should be_invalid
    snippet.errors[:name][0].should == "can't be blank"
    snippet.name = "snippet name"
    snippet.should be_valid
  end

  it "should be invalid without content" do
    snippet = Snippet.new
    snippet.name = "snippet name"
    snippet.should be_invalid
    snippet.errors[:content][0].should == "can't be blank"
    snippet.content = "some code"
    snippet.should be_valid
  end
end
