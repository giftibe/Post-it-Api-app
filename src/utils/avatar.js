// @_learnable
// const {email} = Users = require('../postit.models/user.model')
const avatarStyles = [
    'adventurer',
    'adventurer-neutral',
    'avataaars',
    'avataaars-neutral',
    'big-ears',
    'big-ears-neutral',
    'big-smile',
    'bottts',
    'bottts-neutral',
    'croodles',
    'croodles-neutral',
    'fun-emoji',
    'icons',
    'identicon',
    'initials',
    'lorelei',
    'lorelei-neutral',
    'micah',
    'miniavs',
    'open-peeps',
    'personas',
    'pixel-art',
    'pixel-art-neutral',
    'shapes',
    'thumbs',
];

const getRandomAvatarStyle = () => {
    // Got the length of the array
    const arrayLength = avatarStyles.length;

    // Looped through the array and got a random string
    const avatarIndex = Math.floor(Math.random() * arrayLength);
    const randomString = avatarStyles[avatarIndex];
    return randomString;
};

const generateRandomAvatar = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const _email = email.replaceAll(' ', '');

    const isValidEmail = emailRegex.test(_email);
    if (!isValidEmail) {
        throw new Error('Invalid email');
    }

    const entropySource = () => Math.random().toString(36).substring(2, 7);

    const seed = _email.replace('@', '').replaceAll('.', '');
    const randomAvatarStyle = getRandomAvatarStyle();

    if (!randomAvatarStyle || !avatarStyles.includes(randomAvatarStyle)) {
        console.error('Invalid avatar style');
    }

    const avatarUrl = `https://api.dicebear.com/5.x/${randomAvatarStyle}/svg?seed=${seed}&size=200&radius=50`;

    return avatarUrl;
};
// @_learnable

module.exports = generateRandomAvatar;
