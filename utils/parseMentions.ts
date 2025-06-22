interface User {
    _id: string;
    name: string;
    surname: string;
}

export function parseMentions(text: string, mentions: User[]) {
    const parts: { text: string; isMention: boolean; user?: User }[] = [];
    let lastIndex = 0;
    mentions.forEach((m) => {
      const mentionStr = `@${m.name} ${m.surname}`;
      const index = text.indexOf(mentionStr, lastIndex);
      if (index !== -1) {
        if (index > lastIndex) {
          parts.push({ text: text.substring(lastIndex, index), isMention: false });
        }
        parts.push({ text: mentionStr, isMention: true, user: m });
        lastIndex = index + mentionStr.length;
      }
    });
    if (lastIndex < text.length) {
      parts.push({ text: text.substring(lastIndex), isMention: false });
    }
    return parts;
  }