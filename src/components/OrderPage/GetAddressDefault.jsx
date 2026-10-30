export default function getAddressDefault(addresses = []) {
    return addresses.find(a => a.isDefault) || null;
}

