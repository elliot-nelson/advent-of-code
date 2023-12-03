require '2023/03/day_03'

RSpec.describe Day03, "#part1" do
  context "for example1" do
    it "returns the expected value" do
        part1 = Day03.part1(load_input "2023/03/example1.txt")
        expect(part1).to eq 4361
    end
  end

  context "for my input" do
    it "returns the expected value" do
        part1 = Day03.part1(load_input "2023/03/input.txt")
        expect(part1).to eq 540212
    end
  end
end

RSpec.describe Day03, "#part2" do
  context "for example1" do
    it "returns the expected value" do
        part2 = Day03.part2(load_input "2023/03/example1.txt")
        expect(part2).to eq 467835
    end
  end

  context "for my input" do
    it "returns the expected value" do
        part2 = Day03.part2(load_input "2023/03/input.txt")
        expect(part2).to eq 87605697
    end
  end
end
