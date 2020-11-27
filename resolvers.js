const { join, parse } = require("path");
const { createWriteStream } = require("fs");
const axios = require("axios");
var base64Img = require("base64-img");
var date = require("./currentdate");

// Resolvers define the technique for fetching the types defined in the schema
const resolvers = {
  Query: {
    recipees: () => {
      return axios
        .get("http://localhost:3000/Recipees/")
        .then((res) => res.data);
    },
    recipee: (parent, args) => {
      return axios
        .get("http://localhost:3000/Recipees/" + args.id)
        .then((res) => res.data);
    },
    recipeesByAuthor: (parent, args) => {
      return axios
        .get("http://localhost:3000/Recipees/")
        .then((res) =>
          res.data.filter(({ author }) => author === args.authorName)
        );
    },
  },

  Mutation: {
    addRecipee: (parent, args) => {
      const dest = join(__dirname, "./uploads");
      const filename = args.recipee.recipee + "_photo";
      const extension = args.recipee.photo.split(";")[0].split("/")[1];
      base64Img.imgSync(args.recipee.photo, dest, filename, function (
        err,
        filepath
      ) {});
      const profile_filename = args.recipee.author + "_ProfilePhoto";
      const profile_extension = args.recipee.profile
        .split(";")[0]
        .split("/")[1];
      base64Img.imgSync(args.recipee.profile, dest, profile_filename, function (
        err,
        filepath
      ) {});
      return axios
        .post("http://localhost:3000/Recipees", {
          author: args.recipee.author,
          recipee: args.recipee.recipee,
          ingredients: args.recipee.ingredients,
          tags: args.recipee.tags,
          procedure: args.recipee.procedure,
          photo: filename + "." + extension,
          profile: profile_filename + "." + profile_extension,
          createdAt: date.date,
          updatedAt: date.date,
        })
        .then((res) => res.data);
    },

    singleUpload: (parent, args) => {
      return args.file.then(async (file) => {
        console.log(file);
        const { createReadStream, filename, mimetype } = file;
        const fileStream = createReadStream();
        fileStream.pipe(createWriteStream(`./uploads/${filename}`));
        return file;
      });
    },
  },
};

module.exports = {
  resolvers: resolvers,
};
