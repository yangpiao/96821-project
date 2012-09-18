require 'spec_helper'

describe "snippets/index" do
  before(:each) do
    assign(:snippets, [
      stub_model(Snippet,
        :name => "Name",
        :desc => "Desc",
        :filetype => 1,
        :content => "Content",
        :user_id => 2
      ),
      stub_model(Snippet,
        :name => "Name",
        :desc => "Desc",
        :filetype => 1,
        :content => "Content",
        :user_id => 2
      )
    ])
  end

  it "renders a list of snippets" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => "Desc".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => "Content".to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
  end
end
