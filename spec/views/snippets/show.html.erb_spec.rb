require 'spec_helper'

describe "snippets/show" do
  before(:each) do
    @snippet = assign(:snippet, stub_model(Snippet,
      :name => "Name",
      :desc => "Desc",
      :filetype => 1,
      :content => "Content",
      :user_id => 2
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Name/)
    rendered.should match(/Desc/)
    rendered.should match(/1/)
    rendered.should match(/Content/)
    rendered.should match(/2/)
  end
end
