{
  mkShell,
  nodePackages,
  pnpm,
  sqlite,
}:
mkShell {
  packages = [
    nodePackages.nodejs
    pnpm
    sqlite
  ];
  shellHook = ''
    echo ${nodePackages.nodejs.version} > .nvmrc
  '';
}
