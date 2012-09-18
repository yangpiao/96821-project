require 'spec_helper'

describe "snippets/edit" do
  before(:each) do
    @snippet = assign(:snippet, stub_model(Snippet,
      :name => "MyString",
      :desc => "MyString",
      :filetype => 1,
      :content => "MyString",
      :user_id => 1
    ))
  end

  it "renders the edit snippet form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => snippets_path(@snippet), :method => "post" do
      assert_select "input#snippet_name", :name => "snippet[name]"
      assert_select "input#snippet_desc", :name => "snippet[desc]"
      assert_select "input#snippet_filetype", :name => "snippet[filetype]"
      assert_select "input#snippet_content", :name => "snippet[content]"
      assert_select "input#snippet_user_id", :name => "snippet[user_id]"
    end
  end
end
