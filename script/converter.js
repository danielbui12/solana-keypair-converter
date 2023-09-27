function updateStatus(status, ...extra) {
  const element = document.querySelector('.status');
  if (status) {
    element.prepend(status + '\n');
  } else {
    element.textContent = status || '';
  }
}

function writeToClipBoard() {
  navigator.clipboard.writeText(document.querySelector("#result input").value);
  return updateStatus("Copied to clip board!");
}

function init() {
  try {
    const query = new URLSearchParams(location.search);
    keyType = query.get("input-type");
    keyValue = query.get("value");
    if (keyType === "Uint8 Array") {
      result = bs58.encode(JSON.parse(keyValue));
    } else {
      let b = bs58.decode(keyValue);
      let j = new Uint8Array(b.buffer, b.byteOffset, b.byteLength / Uint8Array.BYTES_PER_ELEMENT);
      result = `[${j}]`
    }
    document.querySelector("#result input").value = result;
  } catch {
    return updateStatus("Invalid input value type!");
  }
}

init();