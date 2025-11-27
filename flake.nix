{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

    nabiki = {
      url = "github:nadevko/nabiki/v2-alpha";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      self,
      treefmt-nix,
      nabiki,
      nixpkgs,
    }:
    nabiki nixpkgs (
      pkgs:
      let
        treefmt = treefmt-nix.lib.evalModule pkgs {
          programs.nixfmt = {
            enable = true;
            strict = true;
          };
          programs.prettier.enable = true;
        };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodePackages.nodejs
            pnpm
          ];
          shellHook = ''
            echo ${pkgs.nodePackages.nodejs.version} > .nvmrc
          '';
        };
        formatter = treefmt.config.build.wrapper;
        checks.treefmt = treefmt.config.build.check self;
      }
    );
}
