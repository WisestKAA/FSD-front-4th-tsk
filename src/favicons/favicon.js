function importAll(val) {
  val.keys().forEach(val);
}

importAll(require.context('./', true, /\.(svg|png|ico|xml|json|webmanifest)$/));
